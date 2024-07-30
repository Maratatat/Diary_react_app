import React from 'react';
import './SearchBox.css'

const SearchBox = ({query, setQuery}) => {
    const [isSearching, setIsSearching] = React.useState(false);

    return (
        <div className="search_container">
            <div className={"search-box " + (isSearching && 'border-searching')}>
                <div className={"search-icon " + (isSearching && 'si-rotate')}>
                    <i className={"fa fa-search search-icon " + (isSearching && 'si-rotate')}></i>
                </div>
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Search" id="search" autoComplete="off" value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)}/>
                </form>
                <svg className="search-border" version="1.1" viewBox="0 0 671 111">
                    <path className="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280"/>
                    <path className="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280"/>
                </svg>
            </div>
        </div>
    );
};

export default SearchBox;