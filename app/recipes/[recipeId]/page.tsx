import { SingleRecipe } from "@/app/types";
import RecipesImage from "@/components/recipes/RecipesImage";

type RecipePageProps = Promise<{recipeId: string;}>

const RecipesSingle = async (props: { params: RecipePageProps }) => {
    const awaitedParams = await props.params;
    const { recipeId } = awaitedParams;

  const apiKey = process.env.SPOONACULAR_API_KEY;

  async function getRecipe(recipeId: string) {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
      );
      if (!res.ok) throw new Error("Failed to fetch recipe");
      return res.json();
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
    }
  }

  const data: SingleRecipe | null = await getRecipe(recipeId);

  if (!data) {
    return <p>Failed to load recipe.</p>;
  }

  return (
    <section className="max-w-1024 mx-auto flex flex-col gap-10 sm:px-12 [&>div>h2]:text-2xl [&>div>h2]:font-semibold">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-3xl font-semibold">{data.title}</h1>
          <div>
            <p className="inline-block">Cuisines: </p>
            <div className="flex flex-row gap-2.5 flex-wrap">
              {data?.cuisines &&
                data.cuisines.map((cuisune, index) => (
                  <div
                    className="bg-gray-100 rounded-2xl py-2 px-2 text-gray-700"
                    key={index + cuisune}
                  >
                    {cuisune}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p>Types of dish:</p>
            <div className="flex flex-row gap-2.5 flex-wrap">
              {data?.dishTypes &&
                data.dishTypes.map((dishType, index) => (
                  <div
                    className="bg-green-50 rounded-2xl py-2 px-2 text-gray-700"
                    key={index + dishType}
                  >
                    {dishType}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <figure className="w-full aspect-square overflow-hidden relative flex justify-end">
          <RecipesImage image={data.image} title={data.title} />
        </figure>
      </div>
      {data?.extendedIngredients && (
        <div className="flex flex-col gap-2">
          <h2>Ingredients:</h2>
          <ul className="flex flex-row flex-wrap gap-2.5">
            {data?.extendedIngredients &&
              data.extendedIngredients.map((ingredient, index) => (
                <li
                  key={index + ingredient.name}
                  className="flex flex-row gap-1 bg-green-50 rounded-2xl py-2 px-2"
                >
                  {ingredient.nameClean}
                  <span>
                    ({ingredient?.measures?.metric?.amount}{" "}
                    {ingredient?.measures?.metric?.unitShort})
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {data?.summary && (
        <div className="flex flex-col gap-2">
          <h2>Summary:</h2>
          <p dangerouslySetInnerHTML={{ __html: data.summary }}></p>
        </div>
      )}

      {data?.instructions && !data.analyzedInstructions && (
        <div className="flex flex-col gap-2">
          <h2>Instructions:</h2>
          <p dangerouslySetInnerHTML={{ __html: data.instructions }}></p>
        </div>
      )}

      {data?.analyzedInstructions && (
        <div className="flex flex-col gap-2">
          <h2>Instructions:</h2>
          <ol className="flex flex-col gap-8">
            {data.analyzedInstructions[0]?.steps.map((item, index) => (
              <li
                key={index + item.step}
                className=" odd:bg-gray-50 px-4 py-6 flex flex-col gap-3"
              >
                <span className="text-gray-600">Step: {index + 1}</span>
                <div className="flex flex-col gap-3">
                  {item?.ingredients && item.ingredients.length > 0 && (
                    <>
                      <p className="text-[18px]">Ingredients:</p>
                      <ul className="flex flex-row flex-wrap gap-2.5">
                        {item.ingredients.map((ingredient, index) => (
                          <li
                            key={index + ingredient.name}
                            className="flex flex-row gap-1 bg-green-50 rounded-2xl py-2 px-2 capitalize"
                          >
                            {ingredient.localizedName}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {item?.equipment && item.equipment.length > 0 && (
                    <>
                      <p className="text-[18px]">Equipment</p>
                      <ul className="flex flex-row flex-wrap gap-2.5 mb-2">
                        {item.equipment.map((equipment, index) => (
                          <li
                            key={index + equipment.id}
                            className="flex flex-row gap-1 bg-green-50 rounded-2xl py-2 px-2 capitalize"
                          >
                            {equipment.localizedName}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {item?.step && (
                    <div>
                      <p dangerouslySetInnerHTML={{ __html: item.step }}></p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default RecipesSingle;
