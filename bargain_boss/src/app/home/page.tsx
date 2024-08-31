'use client';
import { productList } from "@/utils/Product";
import Card from "@/components/Card";
import './home.css';
import { Suspense, useState } from "react";
import Loading from "../loading";

const Page = () => {
    const [resultList, setResultList] = useState<{ name: string; price: number; image: string; link: string }[]>([]);
    const handleClick = async (param: string) => {
        const response: { name: string; price: number; image: string; link: string }[] = await fetch(`http://localhost:5500/products/${param}`, {
            method: 'GET',
        }).then(res => {
            console.log(res);
            return res.json();
        })
        .catch(err => console.log(err, 'WHY'));
        setResultList(response);
        console.log(resultList)
    };
    return (
        <main>
            <div className="w-full h-full flex justify-center items-center overflow-hidden">
                <div className="w-52 h-lvh overflow-y-scroll flex flex-col gap-2">
                    {
                        productList.map((product, index) => <label htmlFor={index.toString()}>
                            <div className="button-check w-full px-2 py-3 shadow-inner shadow-gray-400 rounded font-bold cursor-pointer active:bg-green-800 active:text-green-50" onClick={() => handleClick(product)}>
                                <input type="radio" name="product" className="hidden" id={`${index}`} />
                                <h2>{product}</h2>
                            </div>
                        </label>)
                    }
                </div>
                <div className="productlist h-lvh flex flex-wrap gap-3 justify-center items-center overflow-scroll" style={{
                    width: "calc( 100lvw - 13rem )"
                }}>
                    <Suspense fallback={<Loading />}>
                    {resultList.map(product => <Card name={product.name} price={product.price} image={product.image} link={product.link} />)}
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

export default Page;