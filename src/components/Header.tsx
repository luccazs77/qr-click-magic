import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, MapPin, Monitor } from "lucide-react";

interface HeaderProps {
  userName: string;
  location: string;
  bancada: string;
  onTrocarBancada?: () => void;
  onSair?: () => void;
}

const Header = ({ userName, location, bancada, onTrocarBancada, onSair }: HeaderProps) => {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="bg-card border-b px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-foreground">Olá, {userName}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
              <span>•</span>
              <Monitor className="h-3 w-3" />
              <span>{bancada}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onTrocarBancada}>
            Trocar Bancada
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSair}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
