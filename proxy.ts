import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const MOCK_MODE =
  !SUPABASE_URL ||
  SUPABASE_URL === "your-supabase-url" ||
  SUPABASE_URL.includes("placeholder");

// ─── Rotas públicas — NUNCA bloqueadas ────────────────────────────────────────
// Importante: /admin/login DEVE estar aqui para evitar redirect loop.
const PUBLIC_PREFIXES = [
  "/admin/login",       // ← login do admin — antes de /admin para ter prioridade
  "/auth/callback",     // OAuth / Magic Link callback
  "/entrar",            // Login de clientes
  "/_next",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/api/frete",
  "/api/cupom",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sempre liberar rotas públicas (sem tocar em cookies)
  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isClientRoute = pathname.startsWith("/conta");

  // Rotas que não precisam de autenticação
  if (!isAdminRoute && !isClientRoute) {
    return NextResponse.next();
  }

  // Em mock mode: liberar tudo sem verificar sessão
  if (MOCK_MODE) {
    return NextResponse.next();
  }

  // ── Criar response base e client Supabase para leitura/atualização de cookie ─
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Propagar atualizações de cookie para a request e para a response
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // getUser() valida o JWT com o servidor Supabase (não confia apenas no cookie local)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Admin routes → redireciona para /admin/login se sem sessão ──────────────
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response; // sessão válida → passa adiante com cookies atualizados
  }

  // ── Client routes (/conta/*) → redireciona para /entrar se sem sessão ───────
  if (isClientRoute) {
    if (!user) {
      const loginUrl = new URL("/entrar", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    // Executa em tudo exceto arquivos estáticos e assets com extensão
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ttf|ico)$).*)",
  ],
};
