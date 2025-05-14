import axios from "axios";

export const updateStatusOrder = async (authtoken, orderId, orderstatus) =>
    await axios.put(process.env.REACT_APP_API + "/admin/order-status",
        { orderId, orderstatus },
        {
            headers: {
                authtoken,
            },
        });

export const getOrdersAdmin = async (authtoken) => {
    return await axios.get(process.env.REACT_APP_API + "/admin/orders", {
        headers: {
            authtoken,
        },
    }
    );
}

//wishlist
export const getWishList = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  }
  );
}

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(process.env.REACT_APP_API + "/user/wishlist", { productId }, {
    headers: {
      authtoken,
    },
  }
  );
}

export const removeWishList = async (authtoken, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};