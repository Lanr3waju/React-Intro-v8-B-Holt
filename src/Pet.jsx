import { Link } from "react-router-dom"
const Pet = ({ name, animal, breed, images, location, id }) => {
    let hero = "https://pets-images.dev-apis.com/pets/none.jpg"
    if (images.length) {
        hero = images[0]
    }

    return (
        // The anchor tag does a full refresh of the page 
        // The link tag is handled by BrowserRouter and does not refresh the page which is better but a bit slower
        // <a href={`/details/${id}`} className="pet">
        <Link to={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{animal} - {breed} - {location}</h2>
            </div>
        </Link>
        // </a>
    )
}

export default Pet;