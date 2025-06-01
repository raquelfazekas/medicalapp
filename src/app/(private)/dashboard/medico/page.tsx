import {
  Bell,
  Calendar,
  Users,
  FileText,
  UserCheck,
  Plus,
  Activity,
  Stethoscope,
  ClipboardList,
  Settings,
  BarChart3,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

// Dados mockados
const statsData = [
  {
    title: "Pacientes Atendidos Hoje",
    value: "24",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Consultas Agendadas",
    value: "18",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Exames Pendentes",
    value: "7",
    icon: FileText,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Médicos Disponíveis",
    value: "12",
    icon: UserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: "Maria Silva",
    time: "09:30",
    doctor: "Dr. João Santos",
    type: "Consulta",
  },
  {
    id: 2,
    patient: "Carlos Oliveira",
    time: "10:15",
    doctor: "Dra. Ana Costa",
    type: "Retorno",
  },
  {
    id: 3,
    patient: "Fernanda Lima",
    time: "11:00",
    doctor: "Dr. Pedro Alves",
    type: "Exame",
  },
  {
    id: 4,
    patient: "Roberto Souza",
    time: "14:30",
    doctor: "Dra. Lucia Mendes",
    type: "Consulta",
  },
];

const weeklyData = [
  { day: "Seg", value: 20 },
  { day: "Ter", value: 25 },
  { day: "Qua", value: 18 },
  { day: "Qui", value: 30 },
  { day: "Sex", value: 24 },
  { day: "Sáb", value: 15 },
  { day: "Dom", value: 8 },
];

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    url: "/",
    isActive: true,
  },
  {
    title: "Pacientes",
    icon: Users,
    url: "/dashboard/pacientes",
  },
  {
    title: "Consultas",
    icon: Calendar,
    url: "/dashboard/consultas",
  },
  {
    title: "Médicos",
    icon: Stethoscope,
    url: "/dashboard/medicos",
  },
  {
    title: "Relatórios",
    icon: ClipboardList,
    url: "/dashboard/relatorios",
  },
  {
    title: "Configurações",
    icon: Settings,
    url: "/dashboard/configuracoes",
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Activity className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">MediCare</span>
            <span className="text-xs text-muted-foreground">
              Clínica Médica
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function Dashboard() {
  const maxValue = Math.max(...weeklyData.map((d) => d.value));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">
                Bem-vindo de volta, Dra. Raquel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white">
                3
              </Badge>
            </Button>
            <UserButton />

            <DropdownMenu>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Dr. Silva
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      silva@medicare.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 space-y-6 p-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Weekly Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Atendimentos da Semana
                </CardTitle>
                <CardDescription>
                  Evolução dos atendimentos nos últimos 7 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-40 gap-2">
                  {weeklyData.map((data, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      <div
                        className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                        style={{
                          height: `${(data.value / maxValue) * 120}px`,
                          minHeight: "4px",
                        }}
                      />
                      <span className="text-xs text-gray-500 font-medium">
                        {data.day}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Próximas Consultas
                  </CardTitle>
                  <CardDescription>Agendamentos para hoje</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Consulta
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {appointment.patient}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.doctor}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {appointment.time}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {appointment.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span>Cadastrar Paciente</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span>Agendar Consulta</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6 text-orange-600" />
                  <span>Gerar Relatório</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
