import classes from "./AvailableMeals.module.scss"
import Card from "../UI/Card";
import Meal from "./MealItem/Meal";
import {useEffect, useState} from "react";
import UseHttp from "../../hooks/use-http";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const {isLoading, error, sendRequest: fetchMeals} = UseHttp()

    useEffect(() => {
        const transformMeals = mealsObj => {
            const loadedMeals = [];
            for (const mealKey in mealsObj) {
                loadedMeals.push({
                    id: mealKey,
                    description: mealsObj[mealKey].description,
                    name: mealsObj[mealKey].name,
                    price: mealsObj[mealKey].price,
                });
            }
            setMeals(loadedMeals);
        };
        fetchMeals(
            {url: "https://react-http-5023f-default-rtdb.firebaseio.com/meals.json"},
            transformMeals);
    }, [fetchMeals]);

    const mealsList = meals.map(meal => <Meal id={meal.id} key={meal.id} price={meal.price}
                                              description={meal.description}
                                              name={meal.name}/>)

    let content = mealsList;

    if(error){
        content = "An error occured !"
    }
    if(isLoading) {
        content = 'Loading meals...';
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {content}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
