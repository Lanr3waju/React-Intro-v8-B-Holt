const SearchParams = () => {
    const location = "Seattle, WA";
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input id="location" value={location} placeholder="location" />
                    <button>Submit</button>
                </label>
            </form>
        </div>
    );
};

export default SearchParams;