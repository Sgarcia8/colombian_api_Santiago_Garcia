# colombian_api_Santiago_Garcia
Breve descripción de tu proyecto. Explica de qué trata y qué problema resuelve.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)

## Descripción

Este proyecto es una aplicación desarrollada en React que utiliza una API web [api-colombia](https://api-colombia.com/) para extraer y presentar información específica sobre Colombia. La aplicación proporciona detalles sobre:

Presidentes de Colombia: Información sobre su partido politico y cuantos fueron electos del mismo.
Aeropuertos: Datos detallados sobre los principales aeropuertos colombianos, incluyendo ubicación y características.
Atracciones Turísticas: Información sobre los lugares turísticos su ubicación y la cantidad de estos por departamento, ayudando a los usuarios a explorar las maravillas de Colombia.
La aplicación organiza esta información en una interfaz amigable y fácil de usar, permitiendo a los usuarios acceder a datos relevantes de manera eficiente.


Se centra en la extracción 

## Tecnologías

Lista las tecnologías y herramientas utilizadas en el proyecto:

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **JavaScript**: Lenguaje de programación principal.
- **JSX**: Sintaxis de extensión para JavaScript utilizada con React.
- **Docker**: Para la contenedorización del entorno.
- **API Web**: Para consumir datos desde una API externa.

## Instalación

Para ejecutar el proyecto usando Docker, sigue estos pasos:

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/Sgarcia8/colombian_api_Santiago_Garcia.git
    ```

2. **Navega al directorio del proyecto**:

    ```bash
    cd .\colombian_api\
    ```

3. **Construye y ejecuta los contenedores**:

    ```bash
    docker-compose up --build
    ```

    Esto construirá las imágenes de Docker y ejecutará los contenedores definidos en el archivo `docker-compose.yml`.

4. **Accede a la aplicación**:

    Abre tu navegador y ve a `http://localhost:80`.

## Uso

Una vez que los contenedores estén en funcionamiento, puedes interactuar con la aplicación según las siguientes instrucciones:

1. **Accede a la interfaz**: Ve a `http://localhost:80` para usar la aplicación.

