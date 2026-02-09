import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";
import { Star, Send, CheckCircle, User, FileText, GraduationCap, CalendarDays } from "lucide-react";

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const atendimentoId = searchParams.get("id") || "N/A";
  const atendente = searchParams.get("atendente") || "N/A";
  const servico = searchParams.get("servico") || "N/A";
  const aluno = searchParams.get("aluno") || "N/A";
  const data = searchParams.get("data") || new Date().toLocaleDateString("pt-BR");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "{}");
    feedbacks[atendimentoId] = { rating, comment };
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Obrigado pelo feedback!",
      description: "Sua avaliação foi enviada com sucesso.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Obrigado!</h2>
            <p className="text-muted-foreground mb-6">
              Sua avaliação foi enviada com sucesso. Agradecemos seu feedback!
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8 pb-6 space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
              <Star className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Avalie o Atendimento</h1>
            <p className="text-muted-foreground text-sm">
              Sua opinião é muito importante para nós
            </p>
          </div>

          {/* Attendance Details */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-2.5 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Atendente:</span>
              <span className="font-medium">{atendente}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Serviço:</span>
              <span className="font-medium">{servico}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Aluno:</span>
              <span className="font-medium">{aluno}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Data:</span>
              <span className="font-medium">{data}</span>
            </div>
          </div>

          {/* Rating */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Como você avalia este atendimento?
              </Label>
              <div className="flex justify-center">
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment" className="text-base font-medium">
                Deixe um comentário (opcional)
              </Label>
              <Textarea
                id="comment"
                placeholder="Conte-nos mais sobre sua experiência..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={500}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Avaliação
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
