import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Clock, User, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Attendance {
  id: string;
  type: string;
  status: "em_andamento" | "finalizado";
  clientName: string;
  clientRA: string;
  time: string;
  hasEvaluation?: boolean;
}

interface AttendanceHistoryProps {
  attendances: Attendance[];
}

const AttendanceHistory = ({ attendances }: AttendanceHistoryProps) => {
  const [feedbacks, setFeedbacks] = useState<Record<string, { rating: number; comment: string }>>({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("feedbacks") || "{}");
    setFeedbacks(stored);

    const handleStorage = () => {
      setFeedbacks(JSON.parse(localStorage.getItem("feedbacks") || "{}"));
    };
    window.addEventListener("storage", handleStorage);
    // Poll for same-tab updates
    const interval = setInterval(() => {
      setFeedbacks(JSON.parse(localStorage.getItem("feedbacks") || "{}"));
    }, 2000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <History className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Histórico de Atendimentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {attendances.map((attendance) => (
          <div
            key={attendance.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{attendance.type}</span>
                <Badge
                  variant={attendance.status === "finalizado" ? "default" : "secondary"}
                  className={
                    attendance.status === "finalizado"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {attendance.status === "finalizado" ? "Finalizado" : "Em andamento"}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>
                    {attendance.clientName} ({attendance.clientRA})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{attendance.time}</span>
                </div>
              </div>
            </div>
            {feedbacks[attendance.id] ? (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < feedbacks[attendance.id].rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-transparent text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            ) : attendance.status === "finalizado" ? (
              <span className="text-xs text-muted-foreground">Sem avaliação</span>
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AttendanceHistory;
