const Card = ({name, price, image, link} : {name : string, price : number, image : string, link : string}) => {
    return (
        <a target="_blank" href={link}>
            <div key={name} className="w-80 h-auto py-5 bg-white shadow-xl rounded overflow-hidden hover:scale-105 transition-transform flex flex-col self-stretch">
                <div className="w-full h-96 p-2">
                    <img src={image} alt="Product" className="w-full h-full object-contain" />
                </div>
                <div className="text-container w-full h-80 flex-grow p-3">
                    <h2 className="text-wrap font-bold text-xl">{name}</h2>
                    <span className="text-red-500 text-3xl block">₹{price}</span>
                </div>
            </div>
        </a>
    );
}
 
export default Card;