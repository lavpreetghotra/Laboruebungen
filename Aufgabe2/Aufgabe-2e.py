import numpy as np

# Funktion zur Berechnung des Normalenvektors einer Fläche durch das Kreuzprodukt
def normal_vector(p1, p2, p3):
    v1 = np.array(p2) - np.array(p1)
    v2 = np.array(p3) - np.array(p1)
    normal = np.cross(v1, v2)
    return normal

# Funktion zur Berechnung der Normalenvektoren für jede Fläche des Tetraeders
def tetrahedron_normals(p1, p2, p3, p4):
    normals = []
    normals.append(normal_vector(p1, p2, p3))  # Fläche 1
    normals.append(normal_vector(p1, p2, p4))  # Fläche 2
    normals.append(normal_vector(p1, p3, p4))  # Fläche 3
    normals.append(normal_vector(p2, p3, p4))  # Fläche 4
    return normals

# Funktion zur Berechnung der sichtbaren Flächen aus Sicht des Beobachters
def visible_faces(observer, p1, p2, p3, p4):
    # Berechne die Schwerpunkte der Flächen
    face_centroids = [
        np.mean([p1, p2, p3], axis=0),
        np.mean([p1, p2, p4], axis=0),
        np.mean([p1, p3, p4], axis=0),
        np.mean([p2, p3, p4], axis=0)
    ]

    # Berechne die Normalen der Flächen
    normals = tetrahedron_normals(p1, p2, p3, p4)
    visible_faces_vertices = []

    # Sichtvektor (vom Beobachter in Richtung der Fläche)
    view_vector = np.array([0, 0, 10])

    for i, (normal, centroid) in enumerate(zip(normals, face_centroids)):
        # Berechne das Skalarprodukt der Normalen mit dem Sichtvektor
        dot_product = np.dot(normal, view_vector)

        # Wenn das Skalarprodukt positiv ist, ist die Fläche sichtbar
        if dot_product > 0:
            if i == 0:
                visible_faces_vertices.append([p1, p2, p3])
            elif i == 1:
                visible_faces_vertices.append([p1, p2, p4])
            elif i == 2:
                visible_faces_vertices.append([p1, p3, p4])
            elif i == 3:
                visible_faces_vertices.append([p2, p3, p4])

    return visible_faces_vertices

# Beispielpunkte für den Tetraeder
p1 = (5, 5, 5)
p2 = (7, 5, 3)
p3 = (6, 5, 1)
p4 = (6, 7, 4)

# Beobachterposition
observer = np.array([0, 0, -10])

# Berechne sichtbare Flächen
visible = visible_faces(observer, p1, p2, p3, p4)

# Ausgabe der sichtbaren Dreiecksflächen
print("Sichtbare Dreiecksflächen (Vertices):")
for i, face in enumerate(visible):
    print(f"Fläche {i + 1}: {face}")
