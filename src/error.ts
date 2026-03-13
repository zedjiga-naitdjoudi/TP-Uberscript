export class TropPauvreErreur extends Error {
  prixCommande: number;
  soldeRestant: number;

  constructor(message: string, prixCommande: number, soldeRestant: number) {
    super(message);
    this.name = "TropPauvreErreur";
    this.prixCommande = prixCommande;
    this.soldeRestant = soldeRestant;
  }
}