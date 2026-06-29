import { getCart } from "@/action/server/carts"
import CheckOut from "@/components/cart/CheckOut"

const CheckoutPage = async () => {

    const cartItems = await getCart();


    const formatCartData = cartItems?.data?.map(item => ({
        ...item,
        _id: item._id.toString(),
        productId: item.productId?.toString()
    }))



    return (
        <div>


            <CheckOut
                cartItems={formatCartData}
            ></CheckOut>

        </div>
    )
}

export default CheckoutPage