/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SingleRecipe {
  id: number;
  image: string;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: any;
  cookingMinutes: any;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: any;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
}

interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

interface Measures {
  us: Us;
  metric: Metric;
}

interface Us {
  amount: number;
  unitShort: string;
  unitLong: string;
}

interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length?: Length;
}

interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

interface Length {
  number: number;
  unit: string;
}
