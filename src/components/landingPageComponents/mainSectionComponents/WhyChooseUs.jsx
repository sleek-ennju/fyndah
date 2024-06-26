

function WhyChooseUs() {
    const reasons = [
        {
            index: 1,
            title: "Accurate Data Verification",
            description: "Ensure you’re connecting with genuine prospects.",
        },
        {
            index: 2,
            title: "Real-Time Lead Delivery",
            description: "Receive leads instantly to capitalize on every opportunity.",
        },
        {
            index: 3,
            title: "Advanced Business Management",
            description: "Tools to streamline your operations and enhance productivity.",
        },
        {
            index: 4,
            title: "Promote Your Business",
            description: "Listing your business on fyndah puts you in front of millions of potential customers.",
        },

    ];
    return (
        <section className="bg-primary flex flex-col items-center  gap-16 py-24 px-4 sm:px-5 md:px-6 lg:px-16">
            <div className="text-center flex flex-col gap-4 items-center">
                <h5 className="font-poppins text-xs md:text-sm font-medium text-accent bg-accent bg-opacity-15 w-fit rounded-2xl p-2">Fyndah</h5>
                <h3 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">Why choose us</h3>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 justify-center gap-10 lg:gap-16 ">
                {reasons.map(({ index, title, description }) => (
                    <div key={index} className="flex gap-2 w-full md:max-w-[22rem] 2xl:max-w-[24rem] justify-self-center">
                        <p className="text-xl font-poppins font-semibold text-accent">0{index}</p>
                        <hr className="bg-black bg-opacity-50 rounded-lg h-[2px] w-full max-w-8 mt-3" />
                        <div>
                            <h2 className="text-xl md:text-2xl font-poppins font-semibold text-black text-opacity-80">{title}</h2>
                            <p className="text-lg md:text-xl font-roboto font-normal text-black text-opacity-70 mt-2">{description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyChooseUs