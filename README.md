<p align="center">
	<img width="192px" src=".github/icon.jpg" alt="NLW Together 06" style="border-radius: 32px;" /> <br>
  Taiga - A short and cute shortcut app
</p>

<p align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/-Typescript-44475a?logo=typescript&color=191622&logoColor=white" />
  <img alt="Electron" src="https://img.shields.io/badge/-Electron-44475a?logo=electron&color=191622&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/-React-44475a?logo=react&color=191622&logoColor=white" />
  <img alt="C Sharp" src="https://img.shields.io/badge/-CSharp-44475a?logo=csharp&color=191622&logoColor=white" />
  <img alt=".NET" src="https://img.shields.io/badge/-Dotnet-44475a?logo=dotnet&color=191622&logoColor=white" />
</p>

<img src=".github/taiga.png" alt="Captura de Tela da Página Inicial" />

## Taiga - A short and cute shortcut app

Taiga is a speech recognition app that executes registered voice commands.

* **Luiz Gustavo** - *Development* - [iamtheluiz](https://github.com/iamtheluiz)

## Installation

Taiga uses electron with react to create a user interface and .NET to recognize user commands.

### Electron

Use a package manager of your choice (npm, yarn, etc.) in order to install all dependencies

```bash
# Project root
cd taiga/

# Install dependencies
yarn
```

### Taiga Recognition

Inside project root we can find 'TaigaRecognition/' folder, containing the voice recognition application created with C#. To build it we need Visual Studio and ".NET desktop development" workload.

```bash
# Recognition Project
cd taiga/TaigaRecognition

# Publish release
dotnet publish -c Release
```

## Usage

Just run `start` script.

```bash
yarn start
```

## Packaging

To generate the project package based on the OS you're running on, just run:

```bash
yarn package
```
