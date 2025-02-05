import Image from "next/image";
import "../../public/css/destyle.css";
import "../../public/css/style.css";

export default function Page() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo-img-box">
            <Image src="/img/suntory-logo.png" alt="サントリーロゴ" width={200} height={50} />
          </div>
        </div>
      </header>
      <main>
        <section className="first-view">
          <div className="first-title-box">
            <h1 className="title">好きなドリンク、<br />毎月お得に定期発送！</h1>
            <h3 className="middle-text">忙しいあなたにぴったり。好きなドリンクを<br />切らさない習慣を！</h3>
          </div>
          <div className="first-cta">
            <div className="first-cta-btn">
              <h2 className="sub-title">定期購入を始める</h2>
            </div>
          </div>
          <div className="gradation"></div>
        </section>
        <section className="app-slide">
          <div className="container">
            <div className="slider">
              {["screen-slide.png", "screen-slide-2.png", "screen-slide-3.png"].map((img, index) => (
                <div className="img-box" key={index}>
                  <Image src={`/img/${img}`} alt="スクリーンスライド" width={300} height={200} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="service triangle">
          <div className="container">
            <div className="title-box">
              <h1 className="title">Service</h1>
              <p className="main-text">サービス内容</p>
            </div>
            <div className="service-content">
              {[
                { number: 1, title: "好きな飲み物を選んで定期配送", img: "service-1.svg", text: "選べるドリンクの中から..." },
                { number: 2, title: "お得な価格でまとめ買い", img: "service-2.svg", text: "コンビニや自販機で1本ずつ買うより..." },
              ].map((service, index) => (
                <div className="card" key={index}>
                  <div className="number-icon">
                    <h1 className="title">{service.number}</h1>
                  </div>
                  <h2 className="card-title sub-title">{service.title}</h2>
                  <div className="img-box">
                    <Image src={`/img/${service.img}`} alt="" width={100} height={100} />
                  </div>
                  <p className="main-text">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
