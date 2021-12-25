import React from "react";

import { Box, makeStyles } from "@material-ui/core";
import Navbar from "../components/navbar";
import HomeBanner from "../components/header/banner";
import PosterRow from "../components/poster-grid";
import FeaturedBrandsRow from "../components/featured";
import ProductRow from "../components/product/product-grid";
import Footer from "../components/footer/footer";
import { featuredBrandLinks, posterLinks } from "../constants/data";

import "../styles/home-page.css";
import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles({
  homePage: {
    marginTop: 60,
  },
});
function HomePage() {
  const classes = useStyles();

  return (
    <Box className={classes.homePage}>
      <Navbar />
      <HomeBanner />
      <div>
        <ProductRow
          categoryName=""
          title="Top deals"
        />
      </div>
      <PosterRow
        imgUrls={posterLinks.links2}
      />
      <ProductRow
        title="Summer '22"
        categoryName="summer_deals"
      />
      <PosterRow
        imgUrls={posterLinks.links3}
      />
      <ProductRow title="Trending" categoryName="trending" />
      <PosterRow
        imgUrls={posterLinks.links4}
      />
      <FeaturedBrandsRow
        brandsUrls={featuredBrandLinks.links1}
      />
      <ProductRow title="Electronics" categoryName="electronics" />
      <PosterRow
        imgUrls={posterLinks.links5}
      />
      <ProductRow title="Appliances" categoryName="appliances" />
      <PosterRow
        imgUrls={posterLinks.links6}
      />
      <FeaturedBrandsRow
        brandsUrls={featuredBrandLinks.links2}
      />
      <ProductRow title="Furniture" categoryName="furniture" />
      <Footer />
    </Box>
  );
}

export default HomePage;
