import { useContextState } from "../../context/StateContext";
import { itemsData, TypeData } from "../../reducers/cartReducer";

const ShopingCart: React.FC = () => {
    // using context api's state
    const { state, dispatch } = useContextState()
    const getTotalItems = (items: TypeData[] = []): number => {
        return items.length;
    };

    const getSubtotal = (items: TypeData[] = []): number => {
        if (items.length === 0) {
            return 0;
        }
        return items.reduce((total, item) => total + item.price, 0);
    };
    return (
        <>
            {/* This section lists all the available items */}
            <section>
                <h2>All Items</h2>
                <ul>
                    {itemsData.map((item) => (
                        <li key={item.id}>
                            {item.name}
                            {/* writing logic for item to be added to cart or if it is aleady added */}
                            {state.cartList.some((dataItem) => dataItem.id === item.id) ? (
                                <button disabled>Added</button>
                            ) : (
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: 'add',
                                            payload: { ...item },
                                        })
                                    }
                                >
                                    Add
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
            {/* This section will list all items which are present in the cart */}
            <section>
                <h2>In Cart</h2>
                {state.cartList.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => dispatch({
                            type: 'remove',
                            payload: item.id
                        })}>remove</button>
                    </li>
                ))}
            </section>
            <section>
                <h4>Total Items In Cart: {getTotalItems(state.cartList)}</h4>
                <h4>Total Price Of Cart Items: {getSubtotal(state.cartList)}</h4>
            </section>
        </>
    )
}

export default ShopingCart;