import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface DayStatisticsProps {
  totalAtendimentos: number;
}

const DayStatistics = ({ totalAtendimentos }: DayStatisticsProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Estatísticas do Dia</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <span className="text-5xl font-bold text-primary">{totalAtendimentos}</span>
        <span className="text-muted-foreground mt-2">Atendimentos</span>
      </CardContent>
    </Card>
  );
};

export default DayStatistics;
