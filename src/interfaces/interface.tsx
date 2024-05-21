export interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number,
  "Area Under Cultivation (UOM:Ha(Hectares))": number
}

export interface YearlyData {
  year: string;
  maxProducedCrop: string;
  minProducedCrop: string;
}

export interface CropWiseData {
  cropName: string;
  avgYield: string;
  avgCultivation: string;
}