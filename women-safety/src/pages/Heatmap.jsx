import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
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
        <h1>HeatMap:</h1>
        <p>
          Explore our interactive heatmap showcasing the distribution of crimes
          against women across India. This visual tool highlights high-risk
          areas, helping to raise awareness and support efforts to enhance
          safety and protection for women nationwide.
        </p>
        <div
          className="tableauPlaceholder"
          id="viz1725183408128"
          style={{ position: "relative", width: "110%", height: "600px", margin: "0 auto" }}
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
  );
}