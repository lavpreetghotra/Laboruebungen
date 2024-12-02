import numpy as np

# Funktion zur Berechnung des Normalenvektors einer Fläche durch das Kreuzprodukt
def normal_vector(p1, p2, p3):
    v1 = np.array(p2) - np.array(p1)
    v2 = np.array(p3) - np.array(p1)
    normal = np.cross(v1, v2)
    norm = np.linalg.norm(normal)
    if norm == 0:
        raise ValueError("Die Punkte sind kollinear, es kann kein Normalenvektor gebildet werden.")
    return normal / norm


# Funktion zur Berechnung des Normalenvektors einer Fläche durch das Kreuzprodukt
def tetrahedron_normals(p1, p2, p3, p4):
    normals = []
    normals.append(normal_vector(p1, p2, p3))  # Fläche 1
    normals.append(normal_vector(p1, p2, p4))  # Fläche 2
    normals.append(normal_vector(p1, p3, p4))  # Fläche 3
    normals.append(normal_vector(p2, p3, p4))  # Fläche 4
    return normals

def check_normals_outward(normals, p1, p2, p3, p4):
    centroid = np.mean([p1, p2, p3, p4], axis=0)
    outward_check = []
    for normal in normals:
        vector_to_centroid = centroid - np.mean([p1, p2, p3, p4], axis=0)
        if np.dot(normal, vector_to_centroid) < 0:
            outward_check.append(False)
        else:
            outward_check.append(True)
    return outward_check

# Beispielpunkte für Tetraeder
p1 = (5, 5, 5)
p2 = (7, 5, 3)
p3 = (6, 5, 1)
p4 = (6, 7, 4)

normals = tetrahedron_normals(p1, p2, p3, p4)
outward_checks = check_normals_outward(normals, p1, p2, p3, p4)

# Formatierte Ausgabe
for i, (normal, outward) in enumerate(zip(normals, outward_checks)):
    normal_tuple = tuple(np.round(normal, 2))  # Normalenvektor auf 2 Dezimalstellen runden
    # Ausgabe im gewünschten Format
    print(f"Normalenvektor der Fläche {i + 1}: ({normal_tuple[0]} / {normal_tuple[1]} / {normal_tuple[2]}), zeigt nach außen: {outward}")
