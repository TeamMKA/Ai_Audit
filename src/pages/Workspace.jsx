import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  FileText,
  MessageCircle,
  Share2,
  Video,
  Plus,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase.js"; // Make sure you import your Firebase config
import { Canvas, Rect } from "fabric";

export default function Workspace() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [findings, setFindings] = useState([]); // Initialize findings as an empty array
  const canvasRef = useRef(null); // Reference to the canvas element
  const [canvas, setCanvas] = useState(null); // Canvas state to add elements dynamically

  const fetchAnomalyData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "anomaly"));
      const anomalyData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Using document ID as the finding ID
        ...doc.data(), // Spread operator to get all fields
      }));

      console.log(anomalyData);

      setFindings(anomalyData);
    } catch (error) {
      console.error("Error fetching anomaly data: ", error);
    }
  };

  useEffect(() => {
    fetchAnomalyData();
  }, []);

  useEffect(() => {
    const initializeFabric = async () => {
      try {
        // Initialize Fabric.js when the component mounts
        const canvasInstance = new Canvas(canvasRef.current);
        setCanvas(canvasInstance); // Store the canvas in state for future use

        // Add a rectangle that represents a "div"
        const rect = new Rect({
          left: 100,
          top: 100,
          fill: "blue",
          width: 200,
          height: 100,
          selectable: true,
        });
        canvasInstance.add(rect);

        // Clean up on unmount
        return () => {
          canvasInstance.dispose();
        };
      } catch (error) {
        console.error("Error initializing Fabric.js: ", error);
      }
    };

    initializeFabric();
  }, []);

  // Function to add elements dynamically to the canvas
  const addDivElement = (type) => {
    if (!canvas) return; // Make sure the canvas is initialized

    let newElement;
    switch (type) {
      case "rectangle":
        newElement = new Rect({
          left: Math.random() * 500,
          top: Math.random() * 300,
          fill: "red",
          width: 150,
          height: 100,
          selectable: true,
        });
        break;
      default:
        return;
    }
    canvas.add(newElement);
  };

  return (
    <div className="flex flex-col h-auto bg-gray-100 text-gray-900">
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <div className="w-16 bg-gray-900 text-white p-4 flex flex-col items-center space-y-4">
          <Button variant="ghost" size="icon">
            <FileText />
          </Button>
          <Button variant="ghost" size="icon">
            <BookOpen />
          </Button>
          <Button variant="ghost" size="icon">
            <Video />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle />
          </Button>
          <div className="flex-grow" />
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </div>

        {/* To-Do List */}
        <div className="w-64 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">To-Do List</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {findings.map((card) => (
              <Card
                key={card.id}
                className={`p-4 mb-2 cursor-pointer ${
                  selectedCard === card.id ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedCard(card.id)}
              >
                {card.description}
              </Card>
            ))}
          </ScrollArea>
          <Button
            className="w-full mt-4"
            onClick={() => addDivElement("rectangle")}
          >
            <Plus className="mr-2" /> Add Rectangle Div
          </Button>
        </div>

        <div>

        

        {/* Main Content */}
        <div className="flex-grow p-8">
          <div className="max-w-4xl mx-auto">
            <Input
              className="w-full mb-8"
              placeholder="Search with Google or enter address"
              prefix={
                <img
                  src="/google-logo.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
              }
            />
            {selectedCard ? (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                  {findings.find((c) => c.id === selectedCard)?.description}
                </h2>
                <p>Edit your content here...</p>
              </Card>
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a card to edit</p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Canvas Area for Fabric.js */}
      <div className="w-full h-full p-8 bg-gray-100 flex justify-center items-center border-t border-gray-300">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-center">
          Canva 
          </h2>
          <canvas
            ref={canvasRef}
            width="800"
            height="600"
            className="border border-gray-300 rounded"
          ></canvas>
        </div>
      </div>
    </div>
  );
}
