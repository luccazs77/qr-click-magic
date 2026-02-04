import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

interface AttendanceStatusProps {
  name: string;
  ra: string;
  status: "em_andamento" | "finalizado";
  attendanceId: string;
}

const AttendanceStatus = ({
  name,
  ra,
  status,
  attendanceId,
}: AttendanceStatusProps) => {
  const [isFinalized, setIsFinalized] = useState(status === "finalizado");

  // URL para a página de feedback
  const feedbackUrl = `${window.location.origin}/feedback?id=${attendanceId}`;

  const handleFinalize = () => {
    setIsFinalized(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-lg font-semibold">
          Status do Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center space-y-4">
        {/* QR Code no lugar do avatar */}
        <div className="p-4 bg-white rounded-xl shadow-sm border">
          <QRCodeSVG
            value={feedbackUrl}
            size={120}
            level="H"
            includeMargin={false}
            className="rounded"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Escaneie para avaliar o atendimento
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide">{name}</h2>

        <Badge variant="outline" className="text-sm">
          RA: {ra}
        </Badge>

        <Badge
          variant={isFinalized ? "default" : "secondary"}
          className={
            isFinalized
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
          }
        >
          {isFinalized ? "Finalizado" : "Em andamento"}
        </Badge>

        {!isFinalized && (
          <Button
            onClick={handleFinalize}
            className="w-full mt-4 bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Finalizar Atendimento
          </Button>
        )}

        {isFinalized && (
          <p className="text-sm text-muted-foreground">
            Atendimento finalizado! O cliente pode escanear o QR code para
            deixar sua avaliação.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceStatus;
