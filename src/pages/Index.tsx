import AttendanceStatus from "@/components/AttendanceStatus";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <AttendanceStatus
        name="Pedro Ribeiro Vieira de Souza"
        ra="025325"
        status="em_andamento"
        attendanceId="ATD-2024-001"
      />
    </div>
  );
};

export default Index;
