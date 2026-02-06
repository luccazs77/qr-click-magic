import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface AttendanceStatusProps {
  name: string;
  ra: string;
  status: "em_andamento" | "finalizado";
  attendanceId: string;
  onFinalize?: (attendanceId: string) => void;
}

const AttendanceStatus = ({
  name,
  ra,
  status,
  attendanceId,
  onFinalize,
}: AttendanceStatusProps) => {
  const [copied, setCopied] = useState(false);
  const isFinalized = status === "finalizado";

  // URL para a página de feedback
  const feedbackUrl = `${window.location.origin}/feedback?id=${attendanceId}`;

  const handleFinalize = () => {
    onFinalize?.(attendanceId);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(feedbackUrl);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-2 pb-4">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-lg font-semibold">
          Status do Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center space-y-4 pb-6">
        {/* QR Code no lugar do avatar */}
        <div className="p-3 bg-white rounded-xl shadow-sm border">
          <QRCodeSVG
            value={feedbackUrl}
            size={110}
            level="H"
            includeMargin={false}
            className="rounded"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar Link
            </>
          )}
        </Button>

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
