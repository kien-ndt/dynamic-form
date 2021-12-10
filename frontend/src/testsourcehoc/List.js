import React, { Fragment, useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";

const List = () => {
  const [listData, setListData] = useState([
    {
      name: "French Fries",
      description: "crispy salted fries cooked to order",
      price: "3.99",
      position: 0,
      id: 0,
      description: 
      "__________________________________________________________________________________________"
    },
    {
      name: "Bacon Cheese Burger",
      description:
        "1/3rd pound of ground sirloin topped with bacon, and cheddar",
      price: "17.99",
      position: 1,
      id: 1,
      description: 
      "__________________________________________________________________________________________"
    },
    {
      name: "Fried Chicken",
      description: "crispy spicy fried chicken cooked to order",
      price: "7.99",
      position: 2,
      id: 2,
      description: 
      "__________________________________________________________________________________________"
    },
    {
      name: "Pastor Tacos",
      description: "Three pork tacos with sweet spicy sauce and pineapple",
      price: "8.99",
      position: 3,
      id: 3,
      description: 
      "__________________________________________________________________________________________"
    },
    {
      name: "Tuna Tartar Crispy Tacos",
      description: "crispy shell taco with our premium tuna",
      price: "13.99",
      position: 4,
      id: 4,
      description: 
      "__________________________________________________________________________________________"
    },
    {
      name: "Fiesta Quesadilla",
      description:
        "tortilla filled with peppers, onions, corn, chicken, and montery jack cheese",
      price: "3.99",
      position: 5,
      id: 5,
      description: 
      "__________________________________________________________________________________________"
    },
  ]);

  console.log(listData);

  const myList = listData.map((el) => (
    <div className="list__card">
      <div className="list__card-left">
        <img alt={el.name} />
      </div>
      <div className="list__card-right">
        <div className="list__card-right--name"> {el.name} </div>
        <div className="list__card-right--description"> {el.description} </div>
        <div className="list__card-right--price"> {el.price} </div>
      </div>
    </div>
  ));

  const SortableItem = SortableElement(({ value, index }) => (
    <div className="list__card" index={index}>
      <div className="list__card-left">
        <img alt={value.name} />
      </div>
      <div className="list__card-right">
        <div className="list__card-right--name"> {value.name} </div>
        <div className="list__card-right--description">{value.description}</div>
        <div className="list__card-right--price"> {value.price} </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="list">
        {items
          .sort((a, b) => a.position - b.position)
          .map((value, index) => (
            <SortableItem value={value} index={index} key={value.id} />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(listData, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    setListData(arr);
  };

  const listTitle = <div className="list__title">list items</div>;

  return (
    <Fragment>
      {listTitle}
      <SortableList items={listData} onSortEnd={onSortEnd} axis="xy" />
      {/* <div className="list">{myList}</div> */}
    </Fragment>
  );
};

export default List;