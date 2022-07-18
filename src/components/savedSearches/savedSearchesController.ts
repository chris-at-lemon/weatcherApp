import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { searchHistory } from "../../globalState/atoms/savedSearches";

import { ISavedSearch } from "./savedSearchesInterface";

export const useSearchesController = () => {
  const [savedSearches, setSavedSearches] = useRecoilState(searchHistory);
  //console.log('savedSearches', savedSearches)
  const [allSavedSearchesToDisplay, setAllSavedSearchesToDisplay] = useState<ISavedSearch[]>([]);
  const [savedSearchesToDisplay, setSavedSearchesToDisplay] = useState<ISavedSearch[]>([]);

  // Set initial saved searches to last 3 from persisted history
  // Update when global state changes
  useEffect(() => {
    const history: ISavedSearch[] = [...savedSearches];
    const slicedReverseHistory = history.reverse().slice(0, 3);

    setSavedSearchesToDisplay(slicedReverseHistory);
    setAllSavedSearchesToDisplay(history);
  }, [savedSearches]);

  //console.log('savedSearchesToDisplay', savedSearchesToDisplay)

  // Remove search history item
  function handleRemove(id: number) {
    let newList = savedSearches.filter((item: any) => item.id !== id);
    console.log("newList", newList);
    setSavedSearches(newList);
  }

  // Remove all search history
  function handleRemoveAll() {
    let newList = [...savedSearches];
    newList.length = 0;
    setSavedSearches(newList);
  }

  return {
    savedSearchesToDisplay,
    allSavedSearchesToDisplay,
    fn: {
      handleRemove,
      handleRemoveAll,
    },
  };
};
