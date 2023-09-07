import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const CategoryFilter = ({ setCategoryFilter }) => {

  const { categories } = useSelector((state) => state.getCategories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoReferens = useRef([]);

  const selectCategory = (e, category, index) => {
    setCategoryFilter(items => {
      return { ...items, [category.name]: e.target.checked };
    })

    var noSlashCategory = category.name.split("/")[0];
    var allCategories = categoReferens.current.map((_, id) => {
      return { name: categories[id].name, index: id };
    });
    var majorCategoryIndexes = allCategories.reduce((acc, item) => {
      var catego = item.name.split("/")[0];
      if (noSlashCategory === catego) {
        acc.push(item.index);
      }
      return acc;
    }, [])
    if (e.target.checked) {
      setSelectedCategories((old) => [...old, "catego"]);
      categoReferens.current.map((_, index) => {
        if (!majorCategoryIndexes.includes(index)) categoReferens.current[index].disabled = true;
        return "";
      })
    } else {
      setSelectedCategories((old) => {
        var a = [...old];
        a.pop();
        if (a.length === 0) {
          window.location.href = "/lista-porduktow";
        }
        return a;
      })
      categoReferens.current.map((_, index1) => {
        if (allCategories.length === 1) {
          if (index1 !== index) categoReferens.current[index1].disabled = false;
        } else if (selectedCategories.length === 1) categoReferens.current[index1].disabled = false;
        return "";
      })
    }
  };


  return (
    <>
      <span className="fw-bold">Kategorie</span>
      <Form>
        {categories.map((category, index) => (
          <div key={index}>
            <Form.Check type="checkbox" id={`check-api2-${index}`}>
              <Form.Check.Input ref={(element) => (categoReferens.current[index] = element)} type="checkbox" isValid onChange={(e) => selectCategory(e, category, index)} />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                {category.name}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilter;
