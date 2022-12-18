import { useState, useEffect } from "react";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
import useBreedList from "./useBreedList";
import Results from "./Results";

const SearchParams = () => {
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const breeds = [useBreedList(animal)];

    useEffect(() => {
        requestPets();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const result = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json = await result.json();
        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" onChange={(e) => setLocation(e.target.value)} value={location} placeholder="location" />
                    <button>Submit</button>
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed('');
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
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
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