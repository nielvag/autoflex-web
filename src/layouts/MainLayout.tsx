import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import RawMaterialIcon from "../assets/icons/paint-bucket.svg?react";
import ProductIcon from "../assets/icons/bottle-wine.svg?react";
import PackageIcon from "../assets/icons/package-plus.svg?react";
import MenuIcon from "../assets/icons/menu.svg?react";
import XIcon from "../assets/icons/x.svg?react";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg ${
    isActive ? "bg-black text-white" : "hover:bg-gray-100"
  }`;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen w-screen bg-white">
      {/* Sidebar desktop (md+) */}
      <aside className="hidden md:flex w-72 shrink-0 bg-gray-50">
        <div className="flex flex-col gap-5 w-full px-4 py-4">
          <Link to="/" className="font-semibold text-xl">
            Autoflex
          </Link>

          <nav className="flex flex-col gap-2 text-sm">
            <NavLink to="/products" className={navClass} title="Produtos">
              <ProductIcon className="w-6" />
              Produtos
            </NavLink>

            <NavLink
              to="/raw-materials"
              className={navClass}
              title="Matérias-primas"
            >
              <RawMaterialIcon className="w-6" />
              Matérias-primas
            </NavLink>

            <NavLink
              to="/production-plan"
              className={navClass}
              title="Plano de produção"
            >
              <PackageIcon className="w-6" />
              Plano de produção
            </NavLink>
          </nav>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="md:hidden border-b border-b-gray-200 bg-gray-50">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              aria-label="Abrir menu"
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon className="w-6" />
            </button>

            <Link to="/" className="mx-auto font-semibold text-lg">
              Autoflex
            </Link>
          </div>
        </header>

        <main className="w-full px-4 py-6">{children}</main>
      </div>

      {/* Drawer mobile (<md) */}
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/40 transition-opacity ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-gray-50 shadow-xl transform transition-transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-b-gray-200">
          <Link
            to="/"
            className="font-semibold text-xl"
            onClick={() => setMobileOpen(false)}
          >
            Autoflex
          </Link>
          <button
            type="button"
            aria-label="Fechar menu"
            className="p-2 hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            <XIcon className="w-6 text-black" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 text-sm px-4 py-4">
          <NavLink
            to="/products"
            className={navClass}
            title="Produtos"
            onClick={() => setMobileOpen(false)}
          >
            <ProductIcon className="w-6" />
            Produtos
          </NavLink>

          <NavLink
            to="/raw-materials"
            className={navClass}
            title="Matérias-primas"
            onClick={() => setMobileOpen(false)}
          >
            <RawMaterialIcon className="w-6" />
            Matérias-primas
          </NavLink>

          <NavLink
            to="/production-plan"
            className={navClass}
            title="Plano de produção"
            onClick={() => setMobileOpen(false)}
          >
            <PackageIcon className="w-6" />
            Plano de produção
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
