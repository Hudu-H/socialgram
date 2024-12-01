import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  // const posts = [];

  // // show no post or all post
  // const shouldShowSearchResults = searchValue != "";
  // const shouldShowPost =
  //   !shouldShowSearchResults &&
  //   PostStats.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 w-full px-4 rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search icon"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold ">Popular Now</h3>

        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 oy-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />
        ) : shouldShowPost ? (
          <p className="text-light-center text-4 mt-10 w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div> */}
    </div>
  );
};

export default Explore;
