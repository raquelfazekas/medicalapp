import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Brain,
  Users,
  Clock,
  CheckCircle,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PsychiatristLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">
                Dra. Raquel Fazekas
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sobre
              </Link>
              <Link
                href="#services"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Serviços
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Depoimentos
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contato
              </Link>
              <Link href={"/sign-in"}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-25 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Dra. Raquel Fazekas
                </h1>
                <p className="text-xl text-blue-600 font-medium">
                  Psiquiatra Certificada
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    Mais de 5 anos de experiência
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    Faculdade de Medicina de Taubaté
                  </Badge>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Cuidado Psiquiátrico Empático Personalizado para Você
              </p>

              <p className="text-gray-600">
                Oferecendo um atendimento em saúde mental compassivo e baseado
                em evidências, em um ambiente seguro e acolhedor. Acredito em
                tratar a pessoa como um todo, e não apenas os sintomas, com
                planos de cuidado personalizados que respeitam sua jornada única
                rumo ao bem-estar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contate-me
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <Image
                    src="/profile.png?height=320&width=320"
                    alt="Dr. Sarah Chen"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sobre a Dra. Raquel
            </h2>
            <p className="text-lg text-gray-600">
              Dedicada a oferecer um cuidado excepcional em saúde mental com
              compaixão e expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Users className="h-5 w-5 mr-2" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  Com mais de 5 anos de experiência em psiquiatria, tive o
                  privilégio de ajudar milhares de pacientes a navegar suas
                  jornadas de saúde mental.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      Chefe de Psiquiatria, Hospital Geral Metro (2018-2023)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      Fellowship em Psiquiatria Infantil e Adolescente
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      Pesquisadora publicada em tratamentos para ansiedade e
                      depressão
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80">
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <Brain className="h-5 w-5 mr-2" />
                  Áreas de Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="outline" className="justify-center py-2">
                    Transtornos de Ansiedade
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    Depressão
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    TDAH
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    Transtorno Bipolar
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    TEPT
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    TOC
                  </Badge>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Adoto uma abordagem holística à saúde mental, combinando
                  tratamentos baseados em evidências com planos de cuidado
                  personalizados que atendem às suas necessidades e objetivos
                  únicos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Serviços Oferecidos
            </h2>
            <p className="text-lg text-gray-600">
              Cuidados abrangentes de saúde mental adaptados às suas
              necessidades individuais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">
                  Terapia Individual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Sessões individuais focadas em seus objetivos e desafios
                  específicos de saúde mental.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-600">
                  Gestão de Medicamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Avaliação especializada, prescrição e monitoramento contínuo
                  de medicamentos psiquiátricos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">
                  Consultas Online
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Consultas por telemedicina, confortavelmente de sua casa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600">
              Pronto para dar o primeiro passo? Estou aqui para ajudar você na
              sua jornada para o bem-estar.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="text-blue-600">
                    Informações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">(11) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">
                      draraquelfazekas@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">
                      Rua do Bem-Estar, 123, Sala 200
                      <br />
                      São Francisco, CA 94102
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80">
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Horário de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Segunda - Sexta</span>
                    <span className="text-gray-600">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábado</span>
                    <span className="text-gray-600">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingo</span>
                    <span className="text-gray-600">Fechado</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white/80">
              <CardHeader>
                <CardTitle className="text-gray-800">
                  Envie uma Mensagem
                </CardTitle>
                <CardDescription>
                  Responderei em até 24 horas durante dias úteis.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Nome
                    </label>
                    <Input placeholder="Nome" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Sobrenome
                    </label>
                    <Input placeholder="Sobrenome" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Telefone
                  </label>
                  <Input type="tel" placeholder="(DD) 9999-9999" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Mensagem
                  </label>
                  <Textarea
                    placeholder="Por favor, conte o que trouxe você aqui hoje e como posso ajudar..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold">
                  Dra. Raquel Fazekas
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Oferecendo cuidado psiquiátrico compassivo com expertise e
                empatia.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-white text-sm block"
                >
                  Sobre
                </Link>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-white text-sm block"
                >
                  Serviços
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-white text-sm block"
                >
                  Contato
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Emergência</h3>
              <p className="text-gray-400 text-sm mb-2">
                Se você está passando por uma emergência de saúde mental, por
                favor ligue:
              </p>
              <p className="text-white font-semibold">192</p>
              <p className="text-gray-400 text-sm">ou</p>
              <p className="text-white font-semibold">
                CVV - Centro de Valorização da Vida
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dra. Raquel Fazekas. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
