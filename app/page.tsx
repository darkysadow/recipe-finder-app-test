"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const cuisine: string[] = [
    "Asian",
    "American",
    "Eastern European",
    "European",
    "French",
    "Greek",
    "Italian",
    "Japanese",
  ];

  const [maxPreparationTime, setMaxPreparationTime] = useState<number | "">("");
  const [cuisineSelectValue, setCuisineSelectValue] = useState<
    string | undefined
  >();
  const [recipeInputValue, setRecipeInputValue] = useState<string | "">("");

  const isButtonDisabled = maxPreparationTime === "" && !cuisineSelectValue && recipeInputValue.length === 0

  const handleMaxPreparationTimeInput = (value: string | "") => {
    if (value === "") {
      setMaxPreparationTime("");
      return;
    }
    const numberValue = Number(value);

    if (numberValue >= 0) {
      setMaxPreparationTime(numberValue);
    }
  };
  return (
    <section className="max-w-550 max-sm:px-3 mx-auto py-10 flex flex-col gap-5 items-center [&>div>label]:flex [&>div>label]:flex-col [&>div>label]:gap-1">
      <div className="w-full grid max-sm:grid-cols-1 sm:grid-cols-2 gap-5">
        <label>
          <p>Select a cuisine</p>
          <Select
            value={cuisineSelectValue}
            onValueChange={(val: string) => setCuisineSelectValue(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a cuisine</SelectLabel>
                {cuisine &&
                  cuisine.map((item, index) => (
                    <SelectItem value={item} key={index}>
                      {item}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </label>
        <label>
          <p>Type a maximum preparation time</p>
          <Input
            type="number"
            placeholder="In minutes"
            min={0}
            value={maxPreparationTime}
            onChange={(e) =>
              handleMaxPreparationTimeInput(
                e.target.value ? e.target.value : ""
              )
            }
          />
        </label>
      </div>
      <div className="w-full">
        <label>
          <p>Type a recipe name</p>
          <Input
            type="text"
            value={recipeInputValue}
            onChange={(e) => setRecipeInputValue(e.target.value)}
            placeholder="Type here"
            min={0}
          />
        </label>
      </div>
      <div className="w-full mt-4">
        <Button className="w-full" disabled={isButtonDisabled}>Next</Button>
      </div>
    </section>
  );
}
