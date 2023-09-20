import CardComp from "./card";

export default function Main() {
  return (
    <>
      <div className="container mt-24 flex justify-center gap-16 flex-wrap max-sm:pb-8 px-4">
        <CardComp
          title="Products"
          description={
            "Effortlessly add and manage products with our user-friendly admin dashboard."
          }
          linkName="View Products"
          route="/admin/add/product"
          image="https://www.freeiconspng.com/uploads/add-item-icon-blue-0.png"
        />
        <CardComp
          title="All Order"
          description={
            "Access and review all order details at a glance with our comprehensive order management feature."
          }
          linkName="View Orders"
          route="/admin/orders"
          image="https://icons.veryicon.com/png/o/miscellaneous/data-backstage/order-inquiry-3.png"
        />
      </div>
    </>
  );
}
