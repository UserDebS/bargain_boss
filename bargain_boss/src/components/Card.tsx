const Card = ({name, price, image, link, from} : {name : string, price : number, image : string, link : string, from : string}) => {
    return (
        <a target="_blank" href={link}>
            <div key={name} className="w-80 h-auto py-5 bg-white shadow-xl rounded overflow-hidden hover:scale-105 transition-transform flex flex-col self-stretch">
                <div className="w-full h-96 p-2">
                    <img src={image} alt={name} className="w-full h-full object-contain" />
                </div>
                <div className="text-container w-full h-80 flex-grow p-3">
                    <h2 title={name} className="text-wrap font-bold text-xl">{name.length > 100? name.substring(0, 100)+'...' : name}</h2>
                    <span className="text-red-500 text-3xl block">₹{price}</span>
                    <img className="max-w-20" src={(from === 'amazon') ? 'amazon.png' : 'flipkart.png'} alt={from + ' logo'} />
                </div>
            </div>
        </a>
    );
}
 
export default Card;