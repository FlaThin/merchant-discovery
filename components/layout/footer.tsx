import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

interface FooterProps {
  minimal?: boolean
}

export function Footer({ minimal = false }: FooterProps) {
  if (minimal) {
    return (
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-gray-900">TechWave</span>
            </div>
            <p className="text-sm text-gray-600">© 2024 TechWave. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">TechWave</span>
            </div>
            <p className="text-gray-400 text-sm">
              Sua loja de tecnologia premium. Produtos inovadores para um futuro conectado.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">Produtos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products?category=headphones" className="hover:text-white">
                  Fones de Ouvido
                </Link>
              </li>
              <li>
                <Link href="/products?category=speakers" className="hover:text-white">
                  Caixas de Som
                </Link>
              </li>
              <li>
                <Link href="/products?category=watches" className="hover:text-white">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-white">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Suporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/support" className="hover:text-white">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Entrega
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-gray-400">Receba ofertas exclusivas e novidades em primeira mão.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 TechWave. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-white">
              Termos
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
