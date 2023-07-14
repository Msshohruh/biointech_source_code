import Question from './Question'
import './Faq.css'
function Faq() {
    const data = [
        { id: 1, title: "How much time does it take ?", text: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle." },
        { id: 2, title: "What is your class naming convention ?", text: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle." },
        { id: 3, title: "How do we communicate ?", text: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle." },
        { id: 4, title: "I have a bigger project. Can you handel it ?", text: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle." },
        { id: 5, title: "What is your class naming convention ?", text: "Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle." },
    ]



    return (
        <section className='faq'>
            <div className='faq-container container'>

                <div className="faq-heading">Ko’p beriladigan savollar</div>
                <div className="questions">
                    {data.map((data, i) => {
                        return (
                            <Question data={data} i={i} key={data.id} />
                        )
                    })}
                </div>
            </div>
        </section >
    )
}

export default Faq