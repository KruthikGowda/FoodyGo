import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const add = (restaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavourties = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    setFavourites(newFavourties);
  };

  return (
    <FavoritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourties: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
