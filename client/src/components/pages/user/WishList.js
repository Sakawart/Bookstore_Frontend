import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList, removeWishList } from "../../functions/users";
import { Link } from "react-router-dom";
import { Card, Button } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import _ from "lodash";

const { Meta } = Card;

const WishList = () => {
  const [wishlist, setWishList] = useState([]);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishlist);
    });
  };

  const handleRemove = (productId) => {
    removeWishList(user.token, productId).then(() => {
      loadData();
      toast.success("ลบสินค้าจาก Wishlist สำเร็จ");
    });
  };

  const handleAddToCart = (product) => {
    let cartItems = [];
    if (localStorage.getItem("cart")) {
      cartItems = JSON.parse(localStorage.getItem("cart"));
    }
    cartItems.push({ ...product, count: 1 });
    let unique = _.uniqWith(cartItems, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });
    toast.success("เพิ่มสินค้าเข้าตะกร้าเรียบร้อย");
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 style={{ fontWeight: "bold", color: "#021F59" }}>สินค้าที่คุณชื่นชอบ</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>รายการสินค้าที่คุณเพิ่มไว้ในรายการโปรด</p>
      </div>

      <div className="row">
        {wishlist.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Card
              hoverable
              cover={
                <img
                  className="p-2"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  alt={item.title}
                  src={item.images && item.images.length ? item.images[0].url : ""}
                  onClick={() => window.location.href = `/product/${item._id}`}
                />
              }
              actions={[
                <Button
                  onClick={() => handleAddToCart(item)}
                  type="text"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    color: "#228B22",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  เพิ่มเข้าตะกร้า
                </Button>,
                <Button
                  onClick={() => handleRemove(item._id)}
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  style={{
                    color: "#FF6B00",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  className="wishlist-remove-btn"
                >
                  ลบ
                </Button>
              ]}
            >
              <Meta title={item.title} description={
                <div>
                  <p className="text-muted mb-1">
                    {item.publisher} <br />
                    หมวดหมู่: {item.category && item.category.name ? item.category.name : "ไม่ระบุ"}
                  </p>
                  <h6 style={{ color: "#000000", fontWeight: "bold", textAlign: "right" }}>
                    {item.price} ฿
                  </h6>
                </div>
              } />
            </Card>
          </div>
        ))}
      </div>

      {wishlist.length === 0 && (
        <div className="text-center mt-5">
          <h4 style={{ color: "#555" }}>ไม่มีสินค้าที่คุณชื่นชอบ</h4>
          <Link to="/" className="btn btn-primary mt-3">
            ไปยังหน้าร้านค้า
          </Link>
        </div>
      )}

      <style jsx="true">{`
        .wishlist-remove-btn:hover {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default WishList;
