import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import StarRating from "@/components/StarRating";
import { MessageSquare, Send, CheckCircle } from "lucide-react";

const Feedback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const atendimentoId = searchParams.get("id") || "N/A";
  
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
    
    // Simula envio do feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Feedback enviado:", {
      atendimentoId,
      rating,
      comment,
    });

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
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <MessageSquare className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Avalie seu Atendimento</CardTitle>
          <CardDescription>
            Sua opinião é muito importante para nós!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">
                Como você avalia o atendimento?
              </Label>
              <div className="flex justify-center">
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {rating === 0 && "Selecione uma nota"}
                {rating === 1 && "Muito ruim"}
                {rating === 2 && "Ruim"}
                {rating === 3 && "Regular"}
                {rating === 4 && "Bom"}
                {rating === 5 && "Excelente!"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-base font-medium">
                Deixe seu comentário (opcional)
              </Label>
              <Textarea
                id="comment"
                placeholder="Conte-nos mais sobre sua experiência..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {comment.length}/500 caracteres
              </p>
            </div>

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
