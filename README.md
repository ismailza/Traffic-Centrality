# Traffic Centrality Map Visualization

## Overview
In a collaborative effort, the **Kolmogorov** Team presents the **Traffic Centrality Map Visualization project**. Developed as part of the **Object/IoT Technologies workshop**, this advanced web portal is crafted to analyze and visualize traffic centrality within the bustling urban landscape of **New York City**.

Leveraging the power of `React` and `Leaflet` for responsive map rendering, our portal introduces an innovative approach to visualizing traffic flow and connectivity across diverse locations. The core of our system is powered by the `AGNES` (Agglomerative Nesting) algorithm, enabling sophisticated data classification, segmentation, and enhanced visualization of centrality metrics. This integration not only boosts user engagement but also sharpens the analytical depth, offering nuanced insights into the city's structural dynamics.

## Features
- Dynamic map visualization with zoom and pan functionalities.
- Filterable data based on year, month, day, and time slots.
- Color-coded clusters to represent different traffic flows.
- Detailed information on traffic flow accessible via map markers.

## Technologies Used
This project stands at the intersection of modern web development and advanced data science, leveraging a stack that combines the responsiveness of web interfaces with the computational power of data analysis algorithms.

### Frontend Development
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Leaflet](https://leafletjs.com/): An open-source JavaScript library for mobile-friendly interactive maps.
- [react-leaflet](https://react-leaflet.js.org/): React components for Leaflet maps.

### Data Analysis and Clustering
- **Python**: Serves as the backbone for implementing data analysis algorithms, benefiting from a rich ecosystem of libraries for numerical and scientific computing.
- **AGNES** (Agglomerative Nesting): At the core of our data classification strategy, AGNES enables hierarchical clustering by calculating similarities between observations.
- **Python Libraries**: Leveraged powerful libraries such as [pandas](https://pandas.pydata.org/) for data manipulation and [scikit-learn](https://scikit-learn.org/) for implementing the AGNES algorithm.


### Data Handling and Integration
- **JavaScript**: Employed to process CSV files, calculate centrality metrics, and generate JSON outputs. This allows for seamless integration of analyzed data into our web application, making the results of clustering algorithms accessible and interactive.
- **JSON**: Serves as the interchange format, enabling the structured representation of clustering results and centrality data for visualization in the web application.

### Implementation Insights
Utilizing Python for implementing the AGNES algorithm afforded us access to robust libraries like pandas and scikit-learn, which are indispensable for data analysis. These libraries provided us with the tools necessary to implement our algorithm from scratch, import data, calculate similarities between street observations, and perform hierarchical clustering of streets into meaningful clusters.

## The Team

This endeavor is a collaborative effort by a group of classmates: [Ismail ZAHIR](https://github.com/ismailza), [Khaoula ABASSI](https://github.com/wahya1), [Mohamed JEBBANEMA](https://github.com/medjebb) and [El Mehdi Salah BEN SOUDA](https://github.com/Mehdi-Ben-Souda). As students in the same class, we combined our expertise and enthusiasm to create a tool that offers insightful visualizations about the significance and connectivity of different locations worldwide.

## Acknowledgments

We extend our heartfelt thanks to our teachers, who have guided us through this project with their wisdom and patience. We are grateful for the opportunity to learn and grow under their mentorship.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.