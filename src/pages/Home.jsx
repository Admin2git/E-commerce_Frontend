import React from "react";
import { Header } from "../components/Header";
import UseCateContext from "../contexts/CategoryContext";
import { Footer } from "../components/Footer";

export const Home = () => {
  const { data, loading, error, searchTerm, setSearchTerm } = UseCateContext();

  // Filter categories based on searchTerm
  const filteredCategories = data?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return data ? (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="container pt-4 pb-5 ">
        <h4>All categories</h4>
        <div className="row">
          {filteredCategories && filteredCategories.length > 0 ? (
            filteredCategories.map((cate, index) => {
              return (
                <div key={index} className="col-md-3 mt-4">
                  <a
                    href={`/products/category/${cate._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card">
                      <img
                        src={cate.image}
                        className="card-img"
                        alt={cate.name}
                        style={{ height: "200px", width: "auto" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center">{cate.name} </h5>
                        <p className="card-text  text-center">
                          {cate.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })
          ) : (
            <p>No Category Found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  ) : (
    <p className="container pt-4 pb-5 ">Loading...</p>
  );
};
