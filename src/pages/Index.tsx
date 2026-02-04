import Header from "@/components/Header";
import AttendanceStatus from "@/components/AttendanceStatus";
import DayStatistics from "@/components/DayStatistics";
import AttendanceHistory from "@/components/AttendanceHistory";

const mockAttendances = [
  {
    id: "1",
    type: "Matrícula",
    status: "em_andamento" as const,
    clientName: "PEDRO RIBEIRO VIEIRA DE SOUZA",
    clientRA: "025325",
    time: "16:14",
  },
  {
    id: "2",
    type: "Atendimento",
    status: "finalizado" as const,
    clientName: "BENONI AUGUSTO BRANDAO PEREIRA COSTA",
    clientRA: "025266",
    time: "15:28",
    hasEvaluation: false,
  },
  {
    id: "3",
    type: "Financeiro",
    status: "finalizado" as const,
    clientName: "PEDRO RIBEIRO VIEIRA DE SOUZA",
    clientRA: "025325",
    time: "15:25",
    hasEvaluation: false,
  },
  {
    id: "4",
    type: "Financeiro",
    status: "finalizado" as const,
    clientName: "PEDRO RIBEIRO VIEIRA DE SOUZA",
    clientRA: "025325",
    time: "15:24",
    hasEvaluation: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header
        userName="LUTRIZ SILVA"
        location="TURU"
        bancada="Bancada 2"
        onTrocarBancada={() => console.log("Trocar bancada")}
        onSair={() => console.log("Sair")}
      />

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        {/* Status do Atendimento */}
        <AttendanceStatus
          name="PEDRO RIBEIRO VIEIRA DE SOUZA"
          ra="025325"
          status="em_andamento"
          attendanceId="ATD-2024-001"
        />

        {/* Grid com Estatísticas e Histórico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DayStatistics totalAtendimentos={4} />
          <div className="md:col-span-2">
            <AttendanceHistory attendances={mockAttendances} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
