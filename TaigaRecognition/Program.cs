using System;
using System.Speech.Recognition;
using System.Text.Json;

namespace TaigaRecognition
{
    class Program
    {
        static public List<Command> commands = new List<Command>();

        static void Main(string[] args)
        {

            // Create an in-process speech recognizer for the en-US locale.  
            SpeechRecognitionEngine recognizer =
                new SpeechRecognitionEngine(
                  new System.Globalization.CultureInfo("en-US"));

            // Create and load a dictation grammar.
            GrammarBuilder grammarBuilder = new GrammarBuilder(GetChoices());
            grammarBuilder.Culture = recognizer.RecognizerInfo.Culture;
            Grammar grammar = new Grammar(grammarBuilder);
            recognizer.LoadGrammar(grammar);

            // Add a handler for the speech recognized event.  
            recognizer.SpeechRecognized +=
                new EventHandler<SpeechRecognizedEventArgs>(recognizer_SpeechRecognized);

            // Configure input to the speech recognizer.  
            recognizer.SetInputToDefaultAudioDevice();

            // Start asynchronous, continuous speech recognition.  
            recognizer.RecognizeAsync(RecognizeMode.Multiple);

            // Keep the console window open.
            Console.ReadLine();
        }

        static Choices GetChoices()
        {
            Choices choices = new();

            // Get JSON from taiga electron app
            string json = System.IO.File.ReadAllText("./commands.json");
            commands.AddRange(JsonSerializer.Deserialize<List<Command>>(json));

            commands.ForEach(command => choices.Add(command.name));

            return choices;
        }

        // Handle the SpeechRecognized event.  
        static void recognizer_SpeechRecognized(object sender, SpeechRecognizedEventArgs e)
        {
            if (e.Result.Confidence >= 0.9)
            {
                var command = commands.Find(item => item.name == e.Result.Text);

                Console.WriteLine("Recognized command id: " + command.id);
            }
        }
    }
}