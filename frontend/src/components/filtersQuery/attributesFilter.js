import { Form } from "react-bootstrap";

const AttributesFilter = ({ attributeFilter, setFetchAttributes }) => {
  // console.log(attributeFilter);
  return (
    <>
      {attributeFilter && attributeFilter.length > 0 && attributeFilter.map((item0, index0) => (
        <div key={index0} className="mb-3">
          <Form.Label>
            <b>{item0.key}</b>
          </Form.Label>
          {item0.value.map((item1, index1) => (
            <Form.Check key={index1} type="checkbox" label={item1} onChange={e => {
              setFetchAttributes(items => {
                if (items.length === 0) {
                  return [{ key: item0.key, values: [item1] }];
                }

                let index = items.findIndex((item) => item.key === item0.key);
                if (index === -1) {
                  // if not found (if clicked key is not inside filters)
                  return [...items, { key: item0.key, values: [item1] }];
                }

                // if clicked key is inside filters and checked
                if (e.target.checked) {
                  items[index].values.push(item1);
                  let unique = [...new Set(items[index].values)];
                  items[index].values = unique;
                  return [...items];
                }

                // if clicked key is inside filters and unchecked
                let valuesWithoutUnChecked = items[index].values.filter((val) => val !== item1);
                items[index].values = valuesWithoutUnChecked;
                if (valuesWithoutUnChecked.length > 0) {
                  return [...items];
                } else {
                  let filtersWithoutOneKey = items.filter((item) => item.key !== item0.key);
                  return [...filtersWithoutOneKey];
                }

              })
            }} />
          ))}
        </div>
      ))}

    </>
  );
};

export default AttributesFilter;
