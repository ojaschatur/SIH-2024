import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Heatmap.css";

export default function MapPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="heatmapPage">
        <div className="heatmapText">
          <h1><span>HEATMAP</span> </h1>
          <p>
            This heatmap visually represents the distribution and <span>frequency of crimes</span> against women across different states of India, with darker areas indicating higher crime rates. By providing <span>real-time insights</span>, it helps identify <span>hotspots</span> and <span>trends</span> to enhance safety measures and law enforcement response.
          </p>
        </div>

        <div className="heatmapContainer">
          <div
            className="tableauPlaceholder"
            id="viz1725183408128"
            style={{ position: "relative", width: "100%", height: "100vh", margin: "0 auto" }}
            dangerouslySetInnerHTML={{
              __html: `
                <noscript>
                  <a href='#'>
                    <img alt='Crimes in India' src='https://public.tableau.com/static/images/Cr/CrimesinIndia_17251830549960/CrimesinIndia/1_rss.png' style='border: none; width: 100%; height: auto;' />
                  </a>
                </noscript>
                <object class='tableauViz' style='width: 100%; height: 100%;'>
                  <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                  <param name='embed_code_version' value='3' />
                  <param name='site_root' value='' />
                  <param name='name' value='CrimesinIndia_17251830549960/CrimesinIndia' />
                  <param name='tabs' value='no' />
                  <param name='toolbar' value='yes' />
                  <param name='static_image' value='https://public.tableau.com/static/images/Cr/CrimesinIndia_17251830549960/CrimesinIndia/1.png' />
                  <param name='animate_transition' value='yes' />
                  <param name='display_static_image' value='yes' />
                  <param name='display_spinner' value='yes' />
                  <param name='display_overlay' value='yes' />
                  <param name='display_count' value='yes' />
                  <param name='language' value='en-US' />
                </object>
                <script type='text/javascript'>
                  var divElement = document.getElementById('viz1725183408128');
                  var vizElement = divElement.getElementsByTagName('object')[0];
                  vizElement.style.width='100%';
                  vizElement.style.height='100%';
                  var scriptElement = document.createElement('script');
                  scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                  vizElement.parentNode.insertBefore(scriptElement, vizElement);
                </script>
              `,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}