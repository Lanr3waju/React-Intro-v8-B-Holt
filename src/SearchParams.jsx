import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: '',
    })
    const [animal, setAnimal] = useState("");
    const breeds = [useBreedList(animal)];

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                // new ForData is a browser APi that fetches the data from a from into an object
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    breed: formData.get("breed") ?? "",
                    location: formData.get("locations") ?? "",
                };
                setRequestParams(obj)
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location"
                        name="location"
                        placeholder="location" />
                    <button>Submit</button>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        name="breed"
                    >
                        <option />
                        {breeds[0][0].map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
            </form>
            {
                <Results pets={pets} />
            }
        </div>
    );
};

export default SearchParams;